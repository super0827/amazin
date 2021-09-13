type Props = any;

type Children = React.ReactNode[] & ReactElement<unknown, string | JSXElementConstructor<any>>; // React.ReactChild | React.ReactChild[] | null | undefined;

type ComponentType = React.ExoticComponent | React.LazyExoticComponent;

type StateType = Array<T, React.Dispatch<React.SetStateAction<T>>>;

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

type InputEvent = React.FormEvent<HTMLInputElement>;

type ChangeEvent = React.ChangeEventHandler<HTMLInputElement> & React.ChangeEventHandler<HTMLTextAreaElement>;

type KeyEvent = KeyboardEventHandler<HTMLInputElement> & KeyboardEventHandler<HTMLTextAreaElement>;

type EventType = any;

type SelectType = {
  value: string | number;
  children?: Children;
};

type SetState = React.Dispatch<any>;

type Ref<T> = LegacyRef<T | undefined> | undefined;

// type Lazy = React.LazyExoticComponent<T extends React.ComponentType<any>,T>;
type Lazy = React.LazyExoticComponent<any>;

type LazyPromise = Promise<{ default: any }>;