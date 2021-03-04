import { tf } from '../locale/locale';

const sumStringRender = v => v;

const baseSums = [
  {
    key: 'landscape',
    title: tf('sum.landscape'),
    type: 'string',
    render: sumStringRender,
  },
  {
    key: 'portrait',
    title: tf('sum.portrait'),
    type: 'string',
    render: sumStringRender,
  },
];

const summ = {};
baseSums.forEach((f) => {
  summ[f.key] = f;
});

export default {
};
export {
  summ,
  baseSums,
};
