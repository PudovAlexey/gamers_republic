import { forEachTreeNodes } from '../treeWalker';

describe('for each tee nodes handler test', () => {
  const simpleTree = {
    node: { virtual: true },
    children: [
      {
        node: {
          id: 1,
          text: 'text edition-1',
        },
        children: [
          {
            node: { id: 2, text: 'text edition-1.1' },
          },
          {
            node: { id: 3, text: 'text edition-1.2' },
          },
          {
            node: { id: 4, text: 'text edition-1.3' },
          },
        ],
      },
      {
        node: {
          id: 5,
          text: 'text edition 2',
        },
        children: [
          {
            node: { id: 6, text: 'text edition-2.1' },
          },
          {
            node: { id: 7, text: 'text edition-2.2' },
          },
          {
            node: {
              id: 8,
              text: 'text edition-2.3',
            },
            children: [
              {
                node: { id: 9, text: 'text edition-2.2.1' },
              },
              {
                node: { id: 10, text: 'text edition-2.2.2' },
              },
              {
                node: { id: 11, text: 'text edition-2.2.3' },
              },
            ],
          },
        ],
      },
      {
        node: {
          id: 12,
          text: 'text edition 6',
        },
      },
      {
        node: { id: 13, text: 'text edition 7' },
      },
    ],
  };

  let cloneSimpleTree = null;

  beforeEach(() => {
    cloneSimpleTree = JSON.parse(JSON.stringify(simpleTree));
  });

  test('every change title into replacer', () => {
    const replacer = (node) => ({
      ...node,
      text: 'Hello, I Am replacer',
    });
    expect(
      forEachTreeNodes({
        tree: cloneSimpleTree,
        action: replacer,
      })
    ).toEqual({
      node: { virtual: true },
      children: [
        {
          node: {
            id: 1,
            text: 'Hello, I Am replacer',
            nodeId: '0-0',
          },
          children: [
            {
              node: { id: 2, text: 'Hello, I Am replacer', nodeId: '0-0-0' },
            },
            {
              node: { id: 3, text: 'Hello, I Am replacer', nodeId: '0-0-1' },
            },
            {
              node: { id: 4, text: 'Hello, I Am replacer', nodeId: '0-0-2' },
            },
          ],
        },
        {
          node: {
            id: 5,
            text: 'Hello, I Am replacer',
            nodeId: '0-1',
          },
          children: [
            {
              node: {
                id: 6,
                text: 'Hello, I Am replacer',
                nodeId: '0-1-0',
              },
            },
            {
              node: {
                id: 7,
                text: 'Hello, I Am replacer',
                nodeId: '0-1-1',
              },
            },
            {
              node: {
                id: 8,
                text: 'Hello, I Am replacer',
                nodeId: '0-1-2',
              },
              children: [
                {
                  node: {
                    id: 9,
                    text: 'Hello, I Am replacer',
                    nodeId: '0-1-2-0',
                  },
                },
                {
                  node: {
                    id: 10,
                    text: 'Hello, I Am replacer',
                    nodeId: '0-1-2-1',
                  },
                },
                {
                  node: {
                    id: 11,
                    text: 'Hello, I Am replacer',
                    nodeId: '0-1-2-2',
                  },
                },
              ],
            },
          ],
        },
        {
          node: {
            id: 12,
            text: 'Hello, I Am replacer',
            nodeId: '0-2',
          },
        },
        {
          node: { id: 13, text: 'Hello, I Am replacer', nodeId: '0-3' },
        },
      ],
    });
  });
});
