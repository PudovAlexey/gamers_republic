type TNodeButton = {
  type: 'button';
  action: () => void;
};

type TNodeControl = {
  type: 'control';
  control: React.ReactNode;
};

type TNode = (TNodeButton | TNodeControl) & {
  text: string;
};

type TMenuTree = {
  node: { virtual: boolean } | TNode;
  children?: TMenuTree[];
};

export type { TMenuTree, TNode };
