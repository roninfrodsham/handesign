export interface ConditionalWrapperProps {
  condition?: string;
  wrapper?: any;
  children: any
}

export const ConditionalWrapper = ({ condition, wrapper, children }: ConditionalWrapperProps) => condition ? wrapper(children) : children;