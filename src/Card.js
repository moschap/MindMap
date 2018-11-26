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
    stopClock,
    clockRunning,
    block,
    timing,
    debug,
    Value,
    Clock,
    divide,
    event,
    concat
} = Animated;

function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0)
    };

    const config = {
        duration: 1000,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease)
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock)
        ]),
        timing(clock, state, config),
        cond(state.finished, debug("stop clock", stopClock(clock))),
        state.position
    ]);
}

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTapped: true
        };
        this.trans = new Value(0);
        this._onHandlerStateChange = event([
            {
                nativeEvent: ({ state }) => block([
                    debug('%%%%%%%%%%%%%%', state),
                    cond(
                        eq(state, State.BEGAN),
                        set(this.trans, runTiming(new Clock(), 0, 180))
                    ),
                    //this.trans
                ])
            }
        ]);
        // this._onHandlerStateChange = event => {
        //     if (event.nativeEvent.state === State.ACTIVE) {
        //       Alert.alert("I'm being pressed for so long");
        //     }
        // }
    }

    //callback when the animation is done
    onTapHandler = () => {
        this.setState({ isTapped: !this.isTapped });
    };

    render() {
        //console.log(this.trans)
        const { upperWindow: height, width, data } = this.props;
        return (
            <View style={[styleSheet.upperBoxHeight, { height, width }]}>
                <View
                    style={{
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        width: 200
                    }}
                >
                    <Text style={{ fontWeight: "700", fontSize: 16 }}>
                        New Image
                    </Text>
                </View>
                <TapGestureHandler
                    onGestureEvent={this._onHandlerStateChange}
                    onHandlerStateChange={this._onHandlerStateChange}
                >
                    <Animated.Image
                        source={{ uri: data.front.big_img }}
                        style={{
                            width: 200,
                            height: 200,
                            //elevation: 2,
                            backgroundColor: "#efefff",
                            borderRadius: 10,
                            marginVertical: 12,
                            transform: [{ rotateY: concat(this.trans, "deg") }]
                            //transform: [{translateX: this.trans}]
                        }}
                    />
                </TapGestureHandler>
                {this.state.isTapped && (
                    <Button
                        title="Continue"
                        onPress={() => {}}
                        fontWeight="700"
                        fontSize={17}
                        rounded
                        backgroundColor="blueviolet"
                        containerViewStyle={{ width: 200, borderRadius: 5 }}
                    />
                )}
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
