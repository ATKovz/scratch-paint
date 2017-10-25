import classNames from 'classnames';
import {connect} from 'react-redux';
import Popover from 'react-popover';
import PropTypes from 'prop-types';
import React from 'react';

import {changeBrushSize} from '../../reducers/brush-mode';
import {changeBrushSize as changeEraserSize} from '../../reducers/eraser-mode';

import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';
import {injectIntl, intlShape} from 'react-intl';
import Input from '../forms/input.jsx';
import LabeledIconButton from '../labeled-icon-button/labeled-icon-button.jsx';
import Modes from '../../modes/modes';
import Slider from '../forms/slider.jsx';
import styles from './mode-tools.css';

import brushIcon from '../brush-mode/brush.svg';
import curvedPointIcon from './curved-point.svg';
import eraserIcon from '../eraser-mode/eraser.svg';
import flipHorizontalIcon from './flip-horizontal.svg';
import flipVerticalIcon from './flip-vertical.svg';
import straightPointIcon from './straight-point.svg';

import {MAX_STROKE_WIDTH} from '../../reducers/stroke-width';

const BufferedInput = BufferedInputHOC(Input);
const ModeToolsComponent = props => {
    const brushMessage = props.intl.formatMessage({
        defaultMessage: 'Brush',
        description: 'Label for the brush tool',
        id: 'paint.brushMode.brush'
    });
    const eraserMessage = props.intl.formatMessage({
        defaultMessage: 'Eraser',
        description: 'Label for the eraser tool',
        id: 'paint.eraserMode.eraser'
    });

    switch (props.mode) {
    case Modes.BRUSH:
        return (
            <div className={classNames(props.className, styles.modeTools)}>
                <div>
                    <img
                        alt={brushMessage}
                        className={styles.modeToolsIcon}
                        src={brushIcon}
                    />
                </div>
                <BufferedInput
                    small
                    max={MAX_STROKE_WIDTH}
                    min="0"
                    type="number"
                    value={props.brushValue}
                    onSubmit={props.onBrushSliderChange}
                />
            </div>
        );
    case Modes.ERASER:
        return (
            <div className={classNames(props.className, styles.modeTools)}>
                <div>
                    <img
                        alt={eraserMessage}
                        className={styles.modeToolsIcon}
                        src={eraserIcon}
                    />
                </div>
                <BufferedInput
                    small
                    max={MAX_STROKE_WIDTH}
                    min="0"
                    type="number"
                    value={props.eraserValue}
                    onSubmit={props.onEraserSliderChange}
                />
            </div>
        );
    case Modes.RESHAPE:
        return (
            <div className={classNames(props.className, styles.modeTools)}>
                <LabeledIconButton
                    disabled
                    imgAlt="Curved Point Icon"
                    imgSrc={curvedPointIcon}
                    title="Curved"
                    onClick={function () {}}
                />
                <LabeledIconButton
                    disabled
                    imgAlt="Straight Point Icon"
                    imgSrc={straightPointIcon}
                    title="Pointed"
                    onClick={function () {}}
                />
            </div>
        );
    case Modes.SELECT:
        return (
            <div className={classNames(props.className, styles.modeTools)}>
                <LabeledIconButton
                    disabled
                    imgAlt="Flip Horizontal Icon"
                    imgSrc={flipHorizontalIcon}
                    title="Flip Horizontal"
                    onClick={function () {}}
                />
                <LabeledIconButton
                    disabled
                    imgAlt="Flip Vertical Icon"
                    imgSrc={flipVerticalIcon}
                    title="Flip Vertical"
                    onClick={function () {}}
                />
            </div>
        );
    default:
        // Leave empty for now, if mode not supported
        return (
            <div className={classNames(props.className, styles.modeTools)} />
        );
    }
};

ModeToolsComponent.propTypes = {
    brushValue: PropTypes.number,
    className: PropTypes.string,
    eraserValue: PropTypes.number,
    intl: intlShape.isRequired,
    mode: PropTypes.string.isRequired,
    onBrushSliderChange: PropTypes.func,
    onEraserSliderChange: PropTypes.func
};

const mapStateToProps = state => ({
    mode: state.scratchPaint.mode,
    brushValue: state.scratchPaint.brushMode.brushSize,
    eraserValue: state.scratchPaint.eraserMode.brushSize
});
const mapDispatchToProps = dispatch => ({
    onBrushSliderChange: brushSize => {
        dispatch(changeBrushSize(brushSize));
    },
    onEraserSliderChange: eraserSize => {
        dispatch(changeEraserSize(eraserSize));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(ModeToolsComponent));
