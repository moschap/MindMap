import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

class QuestionCards extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { options } = this.props;
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
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
                                borderRadius: 5,
                                transform: [{ rotateZ }]
                            }}
                        >
                            <Image
                                source={{uri: item.front.small_img}}
                                style={{width: 100, height: 120}}
                            />
                        </View>
                    );
                })}
            </View>
        );
    }
}

export default QuestionCards;
