import React from "react";
import { useParams } from "react-router-dom";

export const Flower = () => {
    const { flowerId } = useParams<{ flowerId: string }>();
    return <div>Flower {flowerId}</div>;
};
