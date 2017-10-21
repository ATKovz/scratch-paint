import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';

import PaperCanvas from '../../containers/paper-canvas.jsx';

import BrushMode from '../../containers/brush-mode.jsx';
import EraserMode from '../../containers/eraser-mode.jsx';
import ReshapeMode from '../../containers/reshape-mode.jsx';
import SelectMode from '../../containers/select-mode.jsx';
import LineMode from '../../containers/line-mode.jsx';
import PenMode from '../../containers/pen-mode.jsx';
import RectMode from '../../containers/rect-mode.jsx';
import OvalMode from '../../containers/oval-mode.jsx';

import FillColorIndicatorComponent from '../../containers/fill-color-indicator.jsx';
import StrokeColorIndicatorComponent from '../../containers/stroke-color-indicator.jsx';
import StrokeWidthIndicatorComponent from '../../containers/stroke-width-indicator.jsx';

import {defineMessages, injectIntl, intlShape} from 'react-intl';
import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';
import Label from '../forms/label.jsx';
import Input from '../forms/input.jsx';

import styles from './paint-editor.css';

const BufferedInput = BufferedInputHOC(Input);
const messages = defineMessages({
    costume: {
        id: 'paint.paintEditor.costume',
        description: 'Label for the name of a sound',
        defaultMessage: 'Costume'
    }
});

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
        return (
            <div className={styles.editorContainer}>
                {/* First row */}
                <div className={styles.row}>
                    {/* Name field */}
                    <div className={styles.inputGroup}>
                        <Label text={this.props.intl.formatMessage(messages.costume)}>
                            <BufferedInput
                                type="text"
                                value={this.props.name}
                                onSubmit={this.props.onUpdateName}
                            />
                        </Label>
                    </div>

                    {/* Undo/Redo */}
                    <div className={styles.inputGroup}>
                        <div className={styles.buttonGroup}>
                            <button
                                className={styles.button}
                                onClick={this.props.onUndo}
                            >
                                Undo
                            </button>
                            <button
                                className={styles.button}
                                onClick={this.props.onRedo}
                            >
                                Redo
                            </button>
                        </div>
                    </div>

                    {/* To be Front/back */}
                    <div className={styles.inputGroup}>
                        <button
                            className={styles.button}
                        >
                            Front
                        </button>
                        <button
                            className={styles.button}
                        >
                            Back
                        </button>
                    </div>

                    {/* To be Group/Ungroup */}
                    <div className={styles.inputGroup}>
                        <button
                            className={styles.button}
                        >
                            Group
                        </button>
                        <button
                            className={styles.button}
                        >
                            Ungroup
                        </button>
                    </div>
                </div>

                {/* Second Row */}
                <div className={styles.row}>
                    {/* fill */}
                    <FillColorIndicatorComponent
                        onUpdateSvg={this.props.onUpdateSvg}
                    />
                    {/* stroke */}
                    <StrokeColorIndicatorComponent
                        onUpdateSvg={this.props.onUpdateSvg}
                    />
                    {/* stroke width */}
                    <StrokeWidthIndicatorComponent
                        onUpdateSvg={this.props.onUpdateSvg}
                    />

                    <div className={styles.inputGroup}>
                        Mode tools
                    </div>
                </div>

                <div className={styles.topAlignRow}>
                    {/* Modes */}
                    {this.state.canvas ? (
                        <div className={styles.modeSelector}>
                            <BrushMode
                                canvas={this.state.canvas}
                                onUpdateSvg={this.props.onUpdateSvg}
                            />
                            <EraserMode
                                canvas={this.state.canvas}
                                onUpdateSvg={this.props.onUpdateSvg}
                            />
                            <PenMode
                                canvas={this.state.canvas}
                                onUpdateSvg={this.props.onUpdateSvg}
                            />
                            <LineMode
                                canvas={this.state.canvas}
                                onUpdateSvg={this.props.onUpdateSvg}
                            />
                            <SelectMode
                                onUpdateSvg={this.props.onUpdateSvg}
                            />
                            <ReshapeMode
                                onUpdateSvg={this.props.onUpdateSvg}
                            />
                            <OvalMode
                                onUpdateSvg={this.props.onUpdateSvg}
                            />
                            <RectMode
                                onUpdateSvg={this.props.onUpdateSvg}
                            />
                        </div>
                    ) : null}

                    {/* Canvas */}
                    <div className={styles.canvasContainer}>
                        <PaperCanvas
                            canvasRef={this.setCanvas}
                            rotationCenterX={this.props.rotationCenterX}
                            rotationCenterY={this.props.rotationCenterY}
                            svg={this.props.svg}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

PaintEditorComponent.propTypes = {
    intl: intlShape,
    name: PropTypes.string,
    onRedo: PropTypes.func.isRequired,
    onUndo: PropTypes.func.isRequired,
    onUpdateName: PropTypes.func.isRequired,
    onUpdateSvg: PropTypes.func.isRequired,
    rotationCenterX: PropTypes.number,
    rotationCenterY: PropTypes.number,
    svg: PropTypes.string
};

export default injectIntl(PaintEditorComponent);
