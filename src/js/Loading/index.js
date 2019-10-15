import React from 'react';

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div>
                <iframe src="https://giphy.com/embed/jAYUbVXgESSti" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/google-icon-loading-jAYUbVXgESSti">via GIPHY</a></p>
            </div>
        )
    }
}

export default Loading;