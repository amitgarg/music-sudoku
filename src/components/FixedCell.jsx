import React from 'react';

export default class FixedCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exposed: props.cellType !== 'music' || props.exposeFixed
    };

    this.toggleExpose = this.toggleExpose.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.cellType !== this.props.cellType) {
      this.setState({ exposed: newProps.cellType !== 'music' || newProps.exposeFixed });
    }
  }

  toggleExpose() {
    this.setState({ exposed: !this.state.exposed });
  }

  render() {
    return (
      <div className={`disabled ${this.props.cellType}`}>
        {this.state.exposed ? this.props.value : 'N'}
        {!this.props.exposeFixed && (
          <button
            className="btn expose"
            onMouseDown={this.toggleExpose}
            onMouseUp={this.toggleExpose}
          >
            expose
          </button>
        )}
      </div>
    );
  }
}
