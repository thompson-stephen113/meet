import { Component } from "react";

// Alert component class
class Alert extends Component {
    constructor(props) {
        super(props);
        this.color = null;
        this.bgColor = null;
    }

    getStyle = () => {
        return {
            color: this.color,
            backgroundColor: this.bgColor,
            borderWidth: "2px",
            borderRadius: "7px",
            borderStyle: "solid",
            fontSize: "12px",
            fontWeight: "bolder",
            textAlign: "center",
            margin: "10px 0",
            padding: "10px"
        };
    }

    render() {
        return (
            <div className="Alert">
                <p style={this.getStyle()}>{this.props.text}</p>
            </div>
        );
    }
}

// InfoAlert subclass
class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = "rgb(0, 0, 255)"; // blue
        this.bgColor = "rgb(220, 220, 255)"; // light blue
    }
}

// ErrorAlert subclass
class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = "rgb(255, 0, 0)"; // red
        this.bgColor = "rgb(255, 200, 200)"; // light red
    }
}

// WarningAlert subclass
class WarningAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = "rgb(255, 165, 0)"; // orange
        this.bgColor = "rgb(255, 255, 0)" // yellow
    }
}

export { InfoAlert, ErrorAlert, WarningAlert };
