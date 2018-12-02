import React, { Component } from "react";
import { View, Text } from "react-native";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import Animated, { Easing } from "react-native-reanimated";

const {
    eq,
    set,
    cond,
    startClock,
    and,
    stopClock,
    clockRunning,
    block,
    debug,
    timing,
    call,
    interpolate,
    Extrapolate,
    Value,
    Clock,
    not,
    divide,
    event,
    concat
} = Animated;

const OFFSET_VALUE = 100;

class Card extends Component {
    constructor(props) {
        super(props);

        //this.onFlipEvent = this.onFlipEvent.bind(this)

        const c = new Clock();
        this.trans = this.runTiming(c, 0, 180);
        this._onHandlerStateChange = event([
            {
                nativeEvent: ({ oldState }) =>
                    block([
                        cond(
                            eq(oldState, State.ACTIVE),
                            startClock(c)
                            //set(this.trans, runTiming(c, 0, 180))
                        )
                        //this.trans
                    ])
            }
        ]);
    }

    onFlipEvent = ([dest]) => {
        this.props.onFlip(dest)
    }

    runTiming(clock, value, dest) {
        const state = {
            finished: new Value(0),
            position: new Value(0),
            time: new Value(0),
            frameTime: new Value(0)
        };

        const config = {
            duration: 300,
            toValue: new Value(0),
            easing: Easing.inOut(Easing.ease)
        };

        // configuration flag on very begging of animation
        const configured = new Value(0);

        return block([
            cond(and(clockRunning(clock), not(configured)), [
                set(state.finished, 0),
                set(state.time, 0),
                set(state.frameTime, 0),
                set(configured, 1),
                cond(
                    eq(state.position, dest),
                    [set(config.toValue, value), set(state.position, dest)],
                    [set(config.toValue, dest), set(state.position, value)]
                )
            ]),
            timing(clock, state, config),
            cond(state.finished, [set(configured, 0), stopClock(clock)]),
            cond(and(state.finished, eq(state.position, dest)), [
                debug(">>>>>>>", state.position),
                call([state.position], this.onFlipEvent)
            ]),
            state.position
        ]);//call([], this.onFlipEvent)
    }

    //callback when the animation is done
    onTapHandler = () => {
        this.setState({ isTapped: !this.isTapped });
    };

    renderImage(height, opacity) {
        return (
            <TapGestureHandler
                onHandlerStateChange={this._onHandlerStateChange}
            >
                <Animated.Image
                    source={{ uri: this.props.data.front.big_img }}
                    style={{
                        width: 200,
                        height,
                        borderRadius: 10,
                        opacity,
                        transform: [{ rotateY: concat(this.trans, "deg") }]
                    }}
                />
            </TapGestureHandler>
        );
    }

    renderText(height, textToDisplay) {
        return (
            <View
                style={{
                    width: 200,
                    height,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#edeeee',
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Text style={{ fontSize: 30, color: 'blueviolet', fontWeight: "700" }}>
                        {textToDisplay}
                </Text>                    
            </View>
        );
    }

    render() {
        const { height } = this.props;
        //console.log(height);
        const opacity = interpolate(this.trans, {
            inputRange: [0, 180],
            outputRange: [1, 0]
        });

        return (
            <View style={[{ height, width: 200 }]}>
                {this.props.face === "front" &&
                    this.renderImage(height, opacity)}
                {this.props.face === "back" &&
                    this.renderText(height, this.props.data.whatisthis)}
            </View>
        );
    }
}

export default Card;
