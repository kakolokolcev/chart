import { ref } from 'vue';

interface IChart {
  node: {
    text: string;
    point: {
      x: number;
      y: number;
    };
  };
}

export const useChart = () => {
  const chart = ref<IChart | null>(null);

  const create = () => {
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;

    chart.value = {
      node: {
        text: 'Нажмите, чтобы изменить заголовок',
        point: {
          x,
          y,
        },
      },
    };
  };

  return { chart, create };
};
