import React from "react";
import Textarea from "react-materialize/lib/Textarea";

const FORBIDDEN_WORDS = ["CREATE", "SET", "MERGE", "DELETE", "DETACH"]

/**
 * A NeoTextArea is a multi-line text entry box with line numbers.
 * NeoTextAreas are used as Cypher-input boxes or to display errors.
 */
class NeoTextArea extends React.Component {
    defaultDisclaimer = 'Limit a query to 1000 result rows for best performance. Cypher parameter keys & values must be in quotes.';
    defaultPlaceholder = "Enter Cypher here... \n";

    /**
     * Initializes the NeoTextArea with a default value.
     */
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.defaultValue,
        }
    }
    /**
     * Renders the component. On change, the method specified in this.props.onChange is called.
     */
    render() {
        return <Textarea
            onChange={e => {
                let arrayOfWords = e.target.value.split(' ')
                for (let word of arrayOfWords) {
                    if (FORBIDDEN_WORDS.includes(word.toUpperCase())) {
                        e.target.value = e.target.value.replace(word, '')
                    }
                }
                let newState = {value: e.target.value};
                this.setState(newState)
                this.props.onChange({'label': this.props.name + "Changed", 'value': e.target.value})
            }}
            value={this.state.value}
            id="Textarea-12"
            l={12}
            m={12}
            s={12}
            placeholder={(this.props.placeholder) ? this.props.placeholder : this.defaultPlaceholder}
            xl={12}><p style={{fontSize: 12}}>{(this.props.disclaimer) ? this.props.disclaimer : this.defaultDisclaimer}</p></Textarea>;
    }
}

export default (NeoTextArea);