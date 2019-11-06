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

        this.handleUpload = this.handleUpload.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleUpload(input) {
        const file = URL.createObjectURL(input.target.files[0]);
        if (file) {
            this.props.handler(file);
        }
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
            width: "10em", 
            height: "8em", 
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
                {!this.props.imageFile ?
                    <input accept=".jpeg, .jpg, .png" type="file" onChange={this.handleUpload} />
                    :
                    <div>
                        <Image
                            style={imageStyles} src={this.props.imageFile} rounded
                        />
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
                }
            </div>
        )
    }
}

export default ImageUploader;