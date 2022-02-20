export abstract class AggregateRoot<T> {
  protected props: T;

  constructor(props: T) {
    // for (const field in props) {
    //   this.props[field] = props[field];
    // }
    this.props = props;
  }
}
