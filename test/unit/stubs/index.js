const products = [
  [
    {
      id: 1,
      name: 'Martelo de Thor',
      quantity: 10,
    },
    {
      id: 2,
      name: 'Traje de encolhimento',
      quantity: 20,
    },
    {
      id: 3,
      name: 'Escudo do Capitão América',
      quantity: 30,
    },
  ],
];

const product = [
  [
    {
      id: 1,
      name: 'Martelo de Thor',
      quantity: 10,
    },
  ],
];

const sales = [
  [
    {
      saleId: 1,
      date: '2022-04-07T20:10:21.000Z',
      productId: 1,
      quantity: 5
    },
    {
      saleId: 1,
      date:'"022-04-07T20:10:21.000Z',
      productId: 2,
      quantity: 10
    },
    {
      saleId: 2,
      date: '2022-04-07T20:10:21.000Z',
      productId: 3,
      quantity: 15
    },
  ],
];

module.exports = {
  products,
  product,
  sales,
};
