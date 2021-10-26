export abstract class AggregateRoot<T> {
  protected props: T;

  constructor(props: T) {
    this.props = props;
  }
}
