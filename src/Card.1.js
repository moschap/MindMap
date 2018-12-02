import React, { Component } from "react";
import { Alert, View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
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
    timing,
    debug,
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
        this.state = {
            isTapped: true
        };
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
            state.position
        ]);
    }
    

    //callback when the animation is done
    onTapHandler = () => {
        this.setState({ isTapped: !this.isTapped });
    };

    render() {
        const { height, width, data } = this.props;
        const opacity = interpolate(this.trans, {
            inputRange: [0, 180],
            outputRange: [1, 0],
            // extrapolate: Extrapolate.CLAMP
        })

        const boxWidth = width - 160
        const boxHeight = height - 100

        console.log('$$$$$$$$$$$$$$', height, boxHeight)
        return (
            <View style={[styleSheet.upperBoxHeight, { height, width }]}>
                <View
                    style={{
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        width: 200
                    }}
                >
                    {/* <Text style={{ fontWeight: "700", fontSize: 16 }}>
                        New Image
                    </Text> */}
                </View>
                <TapGestureHandler
                    onHandlerStateChange={this._onHandlerStateChange}
                >
                    <Animated.Image
                        source={{ uri: data.front.big_img }}
                        style={{
                            position: 'absolute',
                            left: (width - boxWidth)/2,
                            top: (height - boxHeight) / 2,
                            width: boxWidth,
                            height: boxHeight,
                            backgroundColor: "#efefff",
                            borderRadius: 10,
                            marginVertical: 12,
                            opacity,
                            transform: [{ rotateY: concat(this.trans, "deg") }]
                        }}
                    />
                </TapGestureHandler>
                {/* {this.state.isTapped && (
                    <Button
                        title="Continue"
                        onPress={() => {}}
                        fontWeight="700"
                        fontSize={17}
                        rounded
                        backgroundColor="blueviolet"
                        containerViewStyle={{ width: 200, borderRadius: 5 }}
                    />
                )} */}
            </View>
        );
    }
}

const styleSheet = StyleSheet.create({
    upperBoxHeight: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#dedddd"
    }
});

export default Card;
