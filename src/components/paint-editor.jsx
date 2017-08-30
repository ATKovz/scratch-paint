import bindAll from 'lodash.bindall';
import React from 'react';
import PaperCanvas from '../containers/paper-canvas.jsx';
import BrushMode from '../containers/brush-mode.jsx';
import EraserMode from '../containers/eraser-mode.jsx';
import PropTypes from 'prop-types';

class PaintEditorComponent extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'setCanvas'
        ]);
        this.state = {};
    }
    setCanvas (canvas) {
        this.setState({canvas: canvas});
    }
    render () {
        // Modes can't work without a canvas, so we don't render them until we have it
        if (this.state.canvas) {
            return (
                <div>
                    <PaperCanvas
                        canvasRef={this.setCanvas}
                        svg={this.props.svg}
                    />
                    <BrushMode canvas={this.state.canvas} />
                    <EraserMode canvas={this.state.canvas} />
                </div>
            );
        }
        return (
            <div>
                <PaperCanvas canvasRef={this.setCanvas} />
            </div>
        );
    }
}

PaintEditorComponent.propTypes = {
    svg: PropTypes.string
};

export default PaintEditorComponent;
