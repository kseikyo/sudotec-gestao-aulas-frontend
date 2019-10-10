import React, { Component } from 'react';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';

class ClassCard extends Component {
    constructor(props) {
        super(props);
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.state = {
            isHovering: false,
        };
    }

    handleMouseHover() {
        this.setState({
            isHovering: !this.state.isHovering
        }); 
    }

    render() {
        return (
            <Card>
                <Card.Body 
                    onMouseEnter={this.handleMouseHover}
                    onMouseLeave={this.handleMouseHover}
                >
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Subtitle>
                        {props.subtitle}
                    </Card.Subtitle>
                    <Badge pill variant={props.badgeVariant}>
                        {props.badgeText}
                    </Badge>
                    {this.state.isHovering &&
                    <Card.Footer>
                        <Card.Subtitle>Período</Card.Subtitle>
                        <Card.Title>{props.workPeriod}</Card.Title>
                        <Card.Subtitle>Professor</Card.Subtitle>
                        <Card.Title>{props.professor}</Card.Title>
                        <Card.Subtitle>Data de início</Card.Subtitle>
                        <Card.Title>{props.beginning}</Card.Title>
                    </Card.Footer>
                    }
                </Card.Body>
            </Card>
        );
    }
}

export default ClassCard;