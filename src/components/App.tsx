import React from "react";
import {Box, Stack} from "@chakra-ui/layout";
import {Header} from "./Header";
import {Footer} from "./Footer";
import {Heading} from "@chakra-ui/react";
import {IBaseProps} from "../interfaces/props";
import {Navigate, Route, Routes} from "react-router-dom";
import {Home} from "../pages/home";
import {BrowserRouter as Router} from "react-router-dom";
import {NotFound} from "../pages/error/404";

const App:React.FC<IBaseProps> = (props:IBaseProps)=>{

        return(
            <Box minH="100vh" color="white">
                <Heading>
                    <title>altswap.org</title>
                </Heading>
                <Stack spacing={20}>
					<Router>
						<Header />
						<Routes>
							<Route path="/" element={ <Navigate to="/home" />}> </Route>
							<Route path="/home" element={<Home />}> </Route>
							<Route path="/*" element={<NotFound />}> </Route>
						</Routes>
						<Footer/>
					</Router>
                </Stack>
            </Box>
        );
}

export {App};