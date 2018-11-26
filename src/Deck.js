import React, { Component } from "react";
import { Dimensions, View, StyleSheet } from "react-native";

import Card from "./Card";
import QuestionCards from "./QuestionCards";

const { width, height } = Dimensions.get("window");
const upperWindow = height * 0.6;
const lowerWindow = height * 0.4;

const data = [
    {
        id: 1,
        whatisthis: "Dog",
        front: {
            type: "image", //text/image
            text: "",
            big_img: "http://orig00.deviantart.net/abc9/f/2012/192/1/e/happy_dog____by_topas2012-d56wkvz.jpg",
            small_img: "http://orig00.deviantart.net/abc9/f/2012/192/1/e/happy_dog____by_topas2012-d56wkvz.jpg"
        }
    },
    {
        id: 2,
        whatisthis: "Dog",
        front: {
            type: "image", //text/image
            text: "",
            big_img: "https://i.dailymail.co.uk/i/pix/2016/07/17/13/1A32203E000005DC-3694326-image-m-17_1468760305397.jpg",
            small_img: "https://i.dailymail.co.uk/i/pix/2016/07/17/13/1A32203E000005DC-3694326-image-m-17_1468760305397.jpg"
        }
    },
    {
        id: 3,
        whatisthis: "Dog",
        front: {
            type: "image", //text/image
            text: "",
            big_img: "https://www.eicc.edu/images/future-students/events/eagle.jpg",
            small_img: "https://www.eicc.edu/images/future-students/events/eagle.jpg"
        }
    }
];

class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appState: "show",
            currentIndex: 0
        };
    }

    render() {
        const { appState, currentIndex } = this.state;
        return (
            <View style={styleSheet.container}>
                {appState === "show" && (
                    <Card
                        height={upperWindow}
                        width={width}
                        data={data[currentIndex]}
                    />
                )}

                {appState === "show" && (
                //{appState === "tell" && (
                    <View style={{ flex: 1 }}>
                        {/* <Card height={upperWindow} width={width} data={data[currentIndex]} /> */}
                        <View style={styleSheet.lowerBoxHeight}>
                            <QuestionCards options={data} />
                        </View>
                    </View>
                )}
            </View>
        );
    }
}

const styleSheet = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#fff"
    },
    lowerBoxHeight: {
        height: lowerWindow,
        width,
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#dedeee",
        borderWidth: StyleSheet.hairlineWidth
    }
});

export default Deck;
