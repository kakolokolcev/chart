import { Point } from './Point';
import { ConnectionPoint } from './ConnectionPoint';
import { ConnectionControl } from './ConnectionControl';

const DISTANCE_FOR_CREATE_CONTROL = 200;
const DISTANCE_FOR_REMOVE_ANY_CONTROL = 50;

type IPoint = {
  x: number;
  y: number;
  t: number;
};

interface ISettings {
  wasCreatedPrevControl: boolean;
  wasCreatedNextControl: boolean;
  wasRemovedPrevControl: boolean;
  wasRemovedNextControl: boolean;
}

interface IConnectionPoints {
  tailPoints: {
    x: number;
    y: number;
  };
  points: {
    x: number;
    y: number;
    t: number;
  }[];
  headPoints: {
    x: number;
    y: number;
  };
}

export class Connection {
  id: number;

  tailPoints: Point;

  headPoints: Point;

  points = [] as ConnectionPoint[];

  controls = [] as ConnectionControl[];

  settings = {} as ISettings;

  constructor(connectionPoints: IConnectionPoints) {
    const { tailPoints, headPoints, points } = connectionPoints;

    this.id = 1;

    this.tailPoints = new Point(tailPoints.x, tailPoints.y);
    this.headPoints = new Point(headPoints.x, headPoints.y);

    points.forEach((point) => {
      this.points.push(new ConnectionPoint(point));
    });

    this.controls.push(new ConnectionControl(this.points[2], 2));

    this.settings = {
      wasCreatedPrevControl: false,
      wasCreatedNextControl: false,
      wasRemovedPrevControl: false,
      wasRemovedNextControl: false,
    };
  }

  clearSettings() {
    this.settings = {
      wasCreatedPrevControl: false,
      wasCreatedNextControl: false,
      wasRemovedPrevControl: false,
      wasRemovedNextControl: false,
    };
  }

  recalculate(curIndex: number, deltaX: number, deltaY: number) {
    const prev = this.controls.find(({ index }) => index === curIndex - 1);
    const prevPoint = this.points[curIndex - 1];

    const current = this.controls.find(({ index }) => index === curIndex);

    const next = this.controls.find(({ index }) => index === curIndex + 1);
    const nextPoint = this.points[curIndex + 1];

    if (!current) {
      return { newIndex: curIndex };
    }

    const nextNextControl = this.controls.find(({ index }) => index === current.index + 2);
    const nextNextPoint = this.points[current.index + 2];

    this.recalculateControls(
      current,
      next,
      nextPoint,
      nextNextControl,
      nextNextPoint,
      this.createNextControl.bind(this),
      this.removeNextControl.bind(this),
      'wasCreatedNextControl',
      'wasRemovedNextControl',
    );

    const prevPrevControl = this.controls.find(({ index }) => index === current.index - 2);
    const prevPrevPoint = this.points[current.index - 2];

    this.recalculateControls(
      current,
      prev,
      prevPoint,
      prevPrevControl,
      prevPrevPoint,
      this.createPrevControl.bind(this),
      this.removePrevControl.bind(this),
      'wasCreatedPrevControl',
      'wasRemovedPrevControl',
    );

    const point = this.points[current.index];
    const control = this.controls.find(({ index }) => index === current.index);

    point.change(deltaX, deltaY);
    control?.change(deltaX, deltaY);

    return { newIndex: current.index };
  }

  recalculateControls(
    current: ConnectionControl,
    neighbour: ConnectionControl | undefined,
    neighbourPoint: ConnectionPoint,
    afterOneNeighbour: ConnectionControl | undefined,
    afterOneNeighbourPoint: ConnectionPoint,
    create: (a: ConnectionControl, b: ConnectionPoint) => void,
    remove: (a: ConnectionControl) => void,
    createSettingsName: 'wasCreatedNextControl' | 'wasCreatedPrevControl',
    removeSettingsName: 'wasRemovedNextControl' | 'wasRemovedPrevControl',
  ) {
    let distance = null;

    if (this.settings[createSettingsName]) {
      distance = current.distanceBetween(afterOneNeighbour || afterOneNeighbourPoint);
    } else {
      distance = current.distanceBetween(neighbour || neighbourPoint);
    }

    if (distance > DISTANCE_FOR_CREATE_CONTROL) {
      if (this.settings[createSettingsName]) {
        // Если точка была создана в текущей сессии, пересчитать координаты
        const coords = current.getMiddleCoordinates(afterOneNeighbour || afterOneNeighbourPoint);

        neighbour?.setCoordinates(coords);
        neighbourPoint.setCoordinates(coords);
      } else {
        // Создать точку в текущей сессии
        create(current, neighbour || neighbourPoint);

        this.settings[createSettingsName] = true;
        this.settings[removeSettingsName] = false;
      }
    } else {
      // Удаление если создан был в текущей сессии, либо если точка сильно рядом с предудыщей
      if (
        neighbour &&
        (this.settings[createSettingsName] || distance < DISTANCE_FOR_REMOVE_ANY_CONTROL)
      ) {
        remove(neighbour);
      }

      if (this.settings[createSettingsName]) {
        this.settings[removeSettingsName] = true;
        this.settings[createSettingsName] = false;
      }
    }
  }

  removePrevControl(prevControl: ConnectionControl) {
    this.points.splice(prevControl.index, 1);

    const indexControl = this.controls.findIndex(({ index }) => index === prevControl.index);
    this.controls.splice(indexControl, 1);

    this.controls.forEach(({ index: indexItem }, index) => {
      if (indexItem >= prevControl.index) {
        this.controls[index].index -= 1;
      }
    });
  }

  createPrevControl(control: ConnectionControl, prevControl: ConnectionPoint) {
    const newControl = new ConnectionControl(control.getMiddleCoordinates(prevControl), control.index);

    // const newControl = new ConnectionControl(control.getMiddleCoordinatesW(prevControl), control.index);
    const newPoint = new ConnectionPoint(control.getMiddleCoordinates(prevControl));

    this.points.splice(control.index, 0, newPoint);

    this.controls.push(newControl);

    this.controls.forEach(({ index: indexItem }, index) => {
      if (indexItem > control.index) {
        this.controls[index].index += 1;
      }
    });

    control.setIndex(control.index + 1);
  }

  removeNextControl(nextControl: ConnectionControl) {
    this.points.splice(nextControl.index, 1);

    const indexControl = this.controls.findIndex(({ index }) => index === nextControl.index);
    this.controls.splice(indexControl, 1);

    this.controls.forEach(({ index: indexItem }, index) => {
      if (indexItem > nextControl.index) {
        this.controls[index].index -= 1;
      }
    });
  }

  createNextControl(control: ConnectionControl, nextControl: ConnectionPoint) {
    const newControl = new ConnectionControl(control.getMiddleCoordinates(nextControl), control.index + 1);
    const newPoint = new ConnectionPoint(control.getMiddleCoordinates(nextControl));

    this.points.splice(control.index + 1, 0, newPoint);

    this.controls.forEach(({ index: indexItem }, index) => {
      if (indexItem > control.index) {
        this.controls[index].index += 1;
      }
    });

    this.controls.push(newControl);
  }

  selectControlPoint(controlIndex: number) {
    const control = this.controls.find(({ index }) => index === controlIndex);

    control?.select();
  }

  deselectControlPoint(controlIndex: number) {
    const control = this.controls.find(({ index }) => index === controlIndex);

    control?.deselect();
  }
}
