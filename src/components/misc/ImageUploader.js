import React, { Component } from 'react';
import { Button, Image } from 'react-bootstrap';

function ModifiedGlyphButton(props) {
    const styles = {
        backgroundColor: "transparent",
        border: "none",
        color: props.color
    };
    return (
        <Button
            style={styles}
            onClick={props.click}
        >
            <i className={`icon icon-${props.icon || 'plus'} mr-2 align-top`}></i>
            {props.children}
        </Button>
    );
}

class ImageUploader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imagePreview: null,
        }

        this.inputRef = React.createRef();
        this.handleUpload = this.handleUpload.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleUpload(input) {
        const file = input.target.files[0];
        this.props.handler(file);

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = (event) => {
            let imagePreview = event.target.result;

            this.setState({imagePreview});
        };
    }

    componentDidMount() {
        if(this.props.imageFile)
            this.setState({
                imagePreview: this.props.imageFile
            });
    }

    handleEdit() {
        this.props.handler(false, () => {
            document.querySelector('input[type="file"]').click();
        });

    }

    handleDelete() {
        this.props.handler(false);
    }

    render() {
        const imageStyles = { 
            width: "12em", 
            height: "7em", 
            marginLeft: '20px', 
            border: '1px solid black' 
        };

        const spanStyle = () => {
            if(this.props.imageFile){
                return {marginLeft: '20px'}
            } 
            return {};
        }
        return (
            <div>
                <div>
                    <span style={spanStyle()}>Imagem</span>
                </div>
                    <input name={this.props.name} className='d-none' ref={this.inputRef} accept=".jpeg, .jpg, .png" type="file" onChange={this.handleUpload} />
                    <div>
                    {this.state.imagePreview ? 
                        <Image
                            style={imageStyles} src={this.state.imagePreview} rounded
                        /> : 
                        <div className='py-5 bg-light border rounded' onClick={this.handleEdit}></div>
                    }
                        <div className="">
                            <ModifiedGlyphButton
                                click={this.handleEdit} icon="edit" color="#0080C1"
                            >
                                Editar
                            </ModifiedGlyphButton>
                            <ModifiedGlyphButton
                                click={this.handleDelete} icon="delete" color="#F04651"
                            >
                                Excluir
                            </ModifiedGlyphButton>
                        </div>
                    </div>
            </div>
        )
    }
}

export default ImageUploader;