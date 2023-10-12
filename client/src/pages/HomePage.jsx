import { useEffect, useState } from "react";
import { Alert, Button, Card, Carousel, Col, Row } from "react-bootstrap";
import MySpinner from "../layout/MySpinner";
import ApiConfig, { endpoints } from "../configs/ApiConfig";
import { useSearchParams } from "react-router-dom";
import reactIcon from "../assets/react.svg";
import { Header, Post, Slider } from "../components";
import Footer from "../components/Footer";
import { NewsPage } from ".";
import ProjectPage from "./ProjectPage";

const HomePage = () => {

  return (
    <>
      <NewsPage />
      <ProjectPage />
    </>
  );
};

export default HomePage;
