import React, { Component } from 'react';
import { Button, Image } from 'react-bootstrap';

function ModifiedGlyphButton(props) {
    return (
        <Button
            style={{ backgroundColor: "transparent", border: "none", color: props.color }}
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
            imageFile: false
        }

        this.handleUpload = this.handleUpload.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit   = this.handleEdit.bind(this);
    }

    handleUpload(input) {
        const file = URL.createObjectURL(input.target.files[0]);
        if (file) {
            this.setState({
                imageFile: file
            });
        }
    }

    handleEdit() {
        this.setState({
            imageFile: false
        }, () => {
            document.querySelector('input[type="file"]').click();
        });

    }

    handleDelete() {
        this.setState({
            imageFile: false
        });
    }

    render() {
        return (
            <div>
                <div>
                    <span>Imagem</span>
                </div>
                {!this.state.imageFile ?
                    <input accept=".jpeg, .jpg, .png" type="file" onChange={this.handleUpload} />
                    :
                    <div>
                        <Image
                            style={{ width: "6em", height: "6em" }} src={this.state.imageFile} rounded
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