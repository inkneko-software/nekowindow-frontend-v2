import { Popper, Fade, Paper, Stack, Button } from "@mui/material";
import React from "react";

const activeControls = (fade?: boolean) => {
  document.dispatchEvent(new CustomEvent("active-player-controls", { detail: { fade: false } }))
  console.log("go")
}

const dismissControls = (fade?: boolean) => {
  document.dispatchEvent(new CustomEvent("dismiss-player-controls"))
}

const speedRateSwitch = (speedRate: string) => {
  document.dispatchEvent(new CustomEvent("player-switch-speedrate", { detail: { speedRate: speedRate } }))
}

export interface AdaptionSwitchPanelProps {
  open: boolean,
  anchorEl: any,
  adaptions: {
    adaptionName: string,
    adaptionId: number,
  }[],
  currentAdaptionId: number,
  onAdaptionSwitched: (adaptionId: number) => void,
  onOpenStateChange: (open: boolean) => void
}

export default function AdaptionSwitchPanel(props: AdaptionSwitchPanelProps) {

  // const onManifestLoaded = (e: CustomEvent) => {
  //     var adaptationSet: any[] = e.detail.data.Period.AdaptationSet;
  //     var videoRepresentation: any;

  //     // BaseURL: "source-stream0.mp4"
  //     // BaseURL_asArray: ['source-stream0.mp4']
  //     // SegmentList: {Initialization: {…}, Initialization_asArray: Array(1), SegmentURL: Array(247), SegmentURL_asArray: Array(247), __children: Array(248), …}
  //     // SegmentList_asArray: [{…}]
  //     // bandwidth: 2673302
  //     // codecs: "avc1.640028"
  //     // frameRate: "24000/1001"
  //     // height: 1080
  //     // id: "0" //指定ID
  //     // mimeType: "video/mp4"
  //     // width: 1920
  //     console.log(adaptationSet)
  //     for (var i = 0; i < adaptationSet.length; ++i) {

  //         if (adaptationSet[i].contentType === "video") {
  //             videoRepresentation = adaptationSet[i].Representation_asArray
  //             for (var i = 0; i < videoRepresentation.length; i++) {
  //                 setAdaptions((prev) => {
  //                     console.log(videoRepresentation[i].height)
  //                     return [...prev, videoRepresentation[i].height]
  //                 })
  //                 break;
  //             }
  //         }
  //     }

  //     console.log(videoRepresentation)
  // }

  // React.useEffect(() => {
  //     document.addEventListener("nekoplayer-manifest-loaded", onManifestLoaded)
  //     return () => {
  //         document.removeEventListener("nekoplayer-manifest-loaded", onManifestLoaded)
  //     }
  // }, [])

  return (
    <Popper
      open={props.open}
      anchorEl={props.anchorEl}
      transition
      placement="top"
      onMouseMove={() => { activeControls(); }}
      onMouseEnter={() => { props.onOpenStateChange(true) }}
      onMouseLeave={() => { dismissControls(); props.onOpenStateChange(false) }}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper
            sx={{
              bgcolor: "rgba(0,0,0,0.7)",
              marginBottom: 2,
              paddingTop: 1,
              paddingBottom: 1,
            }}
          >
            <Stack>
              {
                props.adaptions.map((adaption, index) => {
                  return (
                    <Button
                      key={index}
                      sx={[{
                        color: "white",
                        width: "130px",
                        ":hover": { bgcolor: "rgba(255,255,255,0.3)" }
                      },
                      props.currentAdaptionId === adaption.adaptionId && { color: "rgba(59, 130, 236)" }]}
                      onClick={() => {
                        props.onAdaptionSwitched(adaption.adaptionId)
                      }}
                    >
                      {adaption.adaptionName}
                    </Button>
                  )
                })
              }
              <Button
                sx={[
                  { color: "white", width: "130px", ":hover": { bgcolor: "rgba(255,255,255,0.3)" } },
                  props.currentAdaptionId === 0 && { color: "rgba(59, 130, 236)" }
                ]}
                onClick={() => {
                  props.onAdaptionSwitched(0)
                }}
              >
                自动
              </Button>
            </Stack>
          </Paper>
        </Fade>
      )
      }
    </Popper >
  )
}