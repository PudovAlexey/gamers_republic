import Figure from '../elements/Figure';
import Queen from '../elements/Queen';

export function FieldTests(field) {
  const figure = new Figure(
    {
      col: 'F',
      row: '6',
    },
    'Black',
    -1,
    field
  );
  const figure2 = new Figure(
    {
      col: 'F',
      row: '4',
    },
    'Black',
    -1,
    field
  );
  const figure3 = new Figure(
    {
      col: 'G',
      row: '5',
    },
    'Red',
    -1,
    field
  );
  const figure4 = new Figure(
    {
      col: 'D',
      row: '2',
    },
    'Red',
    -1,
    field
  );

  field['F']['6'] = figure.render();
  field['F']['6'].figure = figure;
  field['F']['4'] = figure2.render();
  field['F']['4'].figure = figure2;
  field['G']['5'] = figure3.render();
  field['G']['5'].figure = figure3;
  field['G']['5'] = figure3.render();
  field['G']['5'].figure = figure3;
  field['D']['2'] = figure4.render();
  field['D']['2'].figure = figure4;

  const figure5 = new Figure(
    {
      col: 'D',
      row: '4',
    },
    'Black',
    -1,
    field
  );
  const figure6 = new Figure(
    {
      col: 'D',
      row: '6',
    },
    'Black',
    -1,
    field
  );
  const figure7 = new Figure(
    {
      col: 'E',
      row: '5',
    },
    'Red',
    -1,
    field
  );

  field['D']['4'] = figure5.render();
  field['D']['4'].figure = figure5;
  field['D']['6'] = figure6.render();
  field['D']['6'].figure = figure6;
  field['E']['5'] = figure7.render();
  field['E']['5'].figure = figure7;
  return field;
}
