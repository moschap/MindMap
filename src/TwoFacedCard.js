import React, { Component } from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import Card from "./Card";

const { width } = Dimensions.get("window");

class TwoFacedCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false
        };
    }

    
    render() {
        const { height, data } = this.props;
        const titleHeight = height * 0.2;
        const cardHeight = height * 0.6;
        const buttonHeight = height * 0.2;

        return (
            <View style={[styleSheet.container, { height }]}>
                <View style={[styleSheet.tileStyle, { height: titleHeight }]}>
                    <Text style={{ fontSize: 18, fontWeight: "700" }}>
                        New Card
                    </Text>
                </View>

                <View style={[styleSheet.tileStyle, { height: cardHeight }]}>
                    <View
                        style={[styleSheet.cardStyle, { height: cardHeight }]}
                    >
                        <Card height={cardHeight} data={data} face="back" />
                    </View>
                    <View
                        style={[styleSheet.cardStyle, { height: cardHeight }]}
                    >
                        <Card
                            height={cardHeight}
                            data={data}
                            face="front"
                            onFlip={() => {
                                this.setState({ isFlipped: true })
                                this.props.onReadyToRefresh()
                                console.log('$$$$$$$$$$', 'About to call onReady')
                            }}
                        />
                    </View>
                </View>

                <View style={[styleSheet.tileStyle, { height: buttonHeight }]}>
                    {this.state.isFlipped && (
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
            </View>
        );
    }
}

const styleSheet = StyleSheet.create({
    container: {
        width,
        backgroundColor: "pink"
    },
    tileStyle: {
        width,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    cardStyle: {
        position: "absolute",
        top: 0,
        width: 200
    },
    upperBoxHeight: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#dedddd"
    }
});

export default TwoFacedCard;
