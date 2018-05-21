import React from 'react';

export default class FixedCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exposed: props.cellType !== 'music' || props.exposeFixed
    };

    this.toggleExpose = this.toggleExpose.bind(this);
  }

  toggleExpose() {
    this.setState({ exposed: !this.state.exposed });
  }

  render() {
    return this.props.cellType === 'icons' ? (
      <div className="disabled" dangerouslySetInnerHTML={{ __html: this.props.value }} />
    ) : (
      <div className={`disabled ${this.props.cellType}`}>
        {this.state.exposed ? this.props.value : 'N'}
        {this.props.cellType === 'music' && !this.props.exposeFixed && (
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
