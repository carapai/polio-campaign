import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  VStack,
  Image,
  Spacer,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  Progress,
} from "@chakra-ui/react";
import { useStore } from "effector-react";
import { useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { processWastageData } from "../stores/DataProcessors";
import { mainDashboard } from "../stores/Indicators";
import { $store } from "../stores/Store";
import HorizontalBar from "./HorizontalBar";
import MainGraphs from "./MainGraphs";
import MapVisualization from "./MapVisualization";
import OrgUnitTreeSelect from "./OrgUnitTreeSelect";
import SingleValue from "./SingleValue";
import Speed from "./Speed";
const Dashboard = () => {
  const comps = [<Box>1</Box>, <Box>2</Box>, <Box>3</Box>, <Box>4</Box>];
  const [current, setCurrent] = useState<number>(0);
  // setTimeout(() => {
  //   if (current === comps.length - 1) {
  //     setCurrent(0);
  //   } else {
  //     setCurrent(current + 1);
  //   }
  // }, 2000);

  const { colorMode, toggleColorMode } = useColorMode();
  const handle = useFullScreenHandle();
  const store = useStore($store);
  const templateColumns = useBreakpointValue({
    base: "100%",
    lg: "repeat(12, 1fr)",
  });
  const templateRows = useBreakpointValue({
    base: "100%",
    md: "repeat(16, 1fr)",
  });
  const bg = useColorModeValue("white", "#2D3748");
  const realBg = useColorModeValue("gray.300", "gray.900");
  const yColor = useColorModeValue("black", "white");
  return (
    <FullScreen handle={handle}>
      <Box bg={realBg} p="5px">
        <HStack h="60px">
          <Image
            src="https://raw.githubusercontent.com/HISP-Uganda/covid-dashboard/master/src/images/Coat_of_arms_of_Uganda.svg"
            alt="Ministry of Health"
            boxSize="48px"
          />
          <Button>OPV Campaign</Button>
          <Button>Routine Immunization</Button>

          <Spacer />
          <Button onClick={toggleColorMode} ml="400px">
            Toggle {colorMode === "light" ? "Dark" : "Light"}
          </Button>
          <Button onClick={handle.enter}>Enter fullscreen</Button>
          <OrgUnitTreeSelect />
        </HStack>
        <Grid
          overflow="auto"
          h={[
            "auto",
            "auto",
            `calc(100vh - ${handle.active ? "70px" : "118px"})`,
          ]}
          w="calc(100vw - 10px)"
          templateColumns={templateColumns}
          templateRows={templateRows}
          gap={1}
        >
          <GridItem colSpan={[1, 1, 8]} rowSpan={15}>
            <Grid
              templateRows="repeat(6, 1fr)"
              templateColumns="repeat(6, 1fr)"
              gap={1}
              h="100%"
            >
              <GridItem
                direction="column"
                bg={bg}
                colSpan={4}
                justifyContent="center"
                justifyItems="center"
              >
                <Flex
                  direction="row"
                  justifyContent="space-around"
                  justifyItems="center"
                  alignItems="center"
                  h="100%"
                >
                  <SingleValue
                    indicator={mainDashboard.posts(store.selectedUnits)}
                    title="Sub-counties"
                  />
                  <SingleValue
                    indicator={mainDashboard.reported(store.selectedUnits)}
                    title="Reported"
                  />
                  <SingleValue
                    indicator={mainDashboard.rates(store.selectedUnits)}
                    title="Reporting Rates"
                    hasProgress
                    postfix="%"
                  />
                  <SingleValue
                    indicator={mainDashboard.totalWorkers(store.selectedUnits)}
                    title="Total Workers"
                  />
                </Flex>
              </GridItem>
              <GridItem rowSpan={2} colSpan={2} bg={bg}>
                <Grid h="100%" bg={bg}>
                  <GridItem>
                    <VStack
                      justifyItems="space-between"
                      justifyContent="space-between"
                      w="100%"
                      h="100%"
                    >
                      <Flex
                        direction="row"
                        justifyContent="space-around"
                        justifyItems="center"
                        alignItems="center"
                        w="100%"
                        h="100%"
                      >
                        <SingleValue
                          indicator={mainDashboard.aefiCases(
                            store.selectedUnits
                          )}
                          title="AEFI Cases"
                        />
                        <SingleValue
                          indicator={mainDashboard.afpCases(
                            store.selectedUnits
                          )}
                          title="AFP Cases"
                        />
                      </Flex>
                    </VStack>
                  </GridItem>
                  <GridItem>
                    <Speed
                      indicator={mainDashboard.coverage(store.selectedUnits)}
                      title="Vaccination Coverage"
                    />
                  </GridItem>
                </Grid>
              </GridItem>
              <GridItem
                direction="column"
                justifyContent="center"
                colSpan={4}
                bg={bg}
                justifyItems="center"
              >
                <Flex
                  direction="row"
                  justifyContent="space-around"
                  justifyItems="center"
                  alignItems="center"
                  h="100%"
                >
                  <SingleValue
                    indicator={mainDashboard.target(store.selectedUnits)}
                    title="Target"
                  />
                  <SingleValue
                    indicator={mainDashboard.vaccinated(store.selectedUnits)}
                    title="Vaccinated"
                  />
                  <SingleValue
                    indicator={mainDashboard.coverage(store.selectedUnits)}
                    title="Coverage"
                  />
                  {/* <SingleValue
                    indicator={mainDashboard.posts(store.selectedUnits)}
                    title="Workload"
                  /> */}
                </Flex>
              </GridItem>
              <GridItem rowSpan={4} colSpan={6} bg={bg}>
                <MainGraphs yColor={yColor} bg={bg} />
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem colSpan={[1, 1, 4]} rowSpan={15}>
            <Grid templateRows="repeat(6, 1fr)" h="100%" gap={1}>
              <GridItem rowSpan={2}>
                <Grid
                  templateColumns="repeat(2, 1fr)"
                  templateRows="repeat(2, 1fr)"
                  gap={1}
                  h="100%"
                >
                  <GridItem rowSpan={2} h="100%" bg={bg}>
                    <Flex
                      direction="column"
                      h="100%"
                      alignItems="center"
                      justifyContent="space-around"
                      justifyItems="center"
                    >
                      <Flex
                        w="100%"
                        // bg="yellow"
                        justifyContent="space-around"
                        alignItems="center"
                        justifyItems="center"
                      >
                        <SingleValue
                          indicator={mainDashboard.issued(store.selectedUnits)}
                          title="Issued"
                        />
                        <SingleValue
                          indicator={mainDashboard.used(store.selectedUnits)}
                          title="Used"
                        />
                      </Flex>
                      <Flex
                        w="100%"
                        justifyContent="space-around"
                        alignItems="center"
                        justifyItems="center"
                      >
                        <SingleValue
                          indicator={mainDashboard.discarded(
                            store.selectedUnits
                          )}
                          title="Unusable"
                        />
                        <SingleValue
                          indicator={mainDashboard.balance(store.selectedUnits)}
                          title="Available"
                        />
                      </Flex>
                    </Flex>
                  </GridItem>
                  <GridItem rowSpan={2} bg={bg}>
                    <HorizontalBar
                      processor={processWastageData}
                      indicator={mainDashboard.wastageSummary(
                        store.selectedUnits
                      )}
                    />
                  </GridItem>
                </Grid>
              </GridItem>
              <GridItem rowSpan={4} bg={bg}>
                <MapVisualization
                  indicator={mainDashboard.districts(
                    store.selectedUnits,
                    store.currentLevel + 1
                  )}
                />
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem colSpan={12} bg={bg}>
            <HStack>
              <Box>
                <Image
                  src="https://raw.githubusercontent.com/HISP-Uganda/covid-dashboard/master/src/images/h-logo-blue.svg"
                  alt="Ministry of Health"
                  w="100%"
                  maxWidth="160px"
                  h="auto"
                />
              </Box>
              <Spacer />
              <Box>
                <Image
                  src="https://raw.githubusercontent.com/HISP-Uganda/covid-dashboard/master/src/images/logo.png"
                  alt="Ministry of Health"
                  w="100%"
                  maxWidth="110px"
                  h="auto"
                />
              </Box>
            </HStack>
          </GridItem>
        </Grid>
      </Box>
    </FullScreen>
  );
};

export default Dashboard;
