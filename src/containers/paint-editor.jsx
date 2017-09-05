import PropTypes from 'prop-types';
import React from 'react';
import PaintEditorComponent from '../components/paint-editor.jsx';
import {changeMode} from '../reducers/modes';
import Modes from '../modes/modes';
import {connect} from 'react-redux';
import bindAll from 'lodash.bindall';
import paper from 'paper';

class PaintEditor extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleUpdateSvg'
        ]);
    }
    componentDidMount () {
        document.addEventListener('keydown', this.props.onKeyPress);
    }
    componentWillUnmount () {
        document.removeEventListener('keydown', this.props.onKeyPress);
    }
    handleUpdateSvg () {
        if (!this.props.onUpdateSvg) {
            return;
        }
        const bounds = paper.project.activeLayer.bounds;
        this.props.onUpdateSvg(
            paper.project.exportSVG({
                asString: true,
                matrix: new paper.Matrix().translate(-bounds.x, -bounds.y)
            }),
            paper.project.view.center.x - bounds.x,
            paper.project.view.center.y - bounds.y);
    }
    render () {
        return (
            <PaintEditorComponent
                rotationCenterX={this.props.rotationCenterX}
                rotationCenterY={this.props.rotationCenterY}
                svg={this.props.svg}
                onUpdateSvg={this.handleUpdateSvg}
            />
        );
    }
}

PaintEditor.propTypes = {
    onKeyPress: PropTypes.func.isRequired,
    onUpdateSvg: PropTypes.func.isRequired,
    rotationCenterX: PropTypes.number,
    rotationCenterY: PropTypes.number,
    svg: PropTypes.string
};

const mapDispatchToProps = dispatch => ({
    onKeyPress: event => {
        if (event.key === 'e') {
            dispatch(changeMode(Modes.ERASER));
        } else if (event.key === 'b') {
            dispatch(changeMode(Modes.BRUSH));
        } else if (event.key === 'l') {
            dispatch(changeMode(Modes.LINE));
        }
    }
});

export default connect(
    null,
    mapDispatchToProps
)(PaintEditor);
