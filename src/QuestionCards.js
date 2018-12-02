import React, { Component } from "react";
import { Dimensions, View, Text, Image, StyleSheet } from "react-native";

import { TapGestureHandler, State } from "react-native-gesture-handler";
import Animated, { Easing } from "react-native-reanimated";

const {
    Value,
    event,
    set,
    block,
    Clock,
    eq,
    startClock,
    cond,
    not,
    timing,
    and,
    clockRunning,
    stopClock
} = Animated;

const { width, height } = Dimensions.get("window");
class QuestionCards extends Component {
    constructor(props) {
        super(props);
        const entryClock = new Clock();
        const exitClock = new Clock();
        this.entryTranslateY = this.runTiming(entryClock, 0, 180); //TODO: update the 180
        this.exitTranslateX = this.runTiming(exitClock, 0, 180); // TODO: Update the 180

        this._onHandlerStateChange = event([
            {
                nativeEvent: ({ oldState }) =>
                    block([
                        cond(
                            eq(oldState, State.ACTIVE),[
                                startClock(entryClock),
                                startClock(exitClock)
                            ]
                        )
                    ])
            }
        ]);
    }

    runTiming(clock, value, dest) {
        const state = {
            finished: new Value(0),
            position: new Value(0),
            time: new Value(0),
            frameTime: new Value(0)
        };

        const config = {
            duration: 600,
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
            state.position
        ]); //call([], this.onFlipEvent)
    }

    render() {
        const { options } = this.props;
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "space-between"
                }}
            >
                {options.map((item, i) => {
                    let rotateZ = "0deg";
                    if (i === 0) rotateZ = "-4deg";
                    else if (i === 2) rotateZ = "4deg";
                    return (
                        <View
                            key={item.id}
                            style={{
                                width: 100,
                                height: 120,
                                marginHorizontal: 2,
                                backgroundColor: "#efefff",
                                borderRadius: 10,
                                transform: [{ rotateZ }]
                            }}
                        >
                            <TapGestureHandler
                                onHandlerStateChange={this._onHandlerStateChange}
                            >
                                {/* <Image
                                    source={{ uri: item.front.small_img }}
                                    style={{
                                        width: 100,
                                        borderRadius: 10,
                                        height: 120,
                                        transform: [{ rotateZ }]
                                    }}
                                /> */}
                                <Animated.View
                                    style={{
                                        //position: "relative",
                                        // top: height-20,
                                        // left: (width - 200) / 2,
                                        backgroundColor: "#aaaaaa",
                                        width: 100,
                                        height: 120,
                                        transform: [
                                            { translateY: this.entryTranslateY }
                                        ]
                                    }}
                                />
                            </TapGestureHandler>
                        </View>
                    );
                })}
                

            </View>
        );
    }
}

export default QuestionCards;
