import { Popper, Fade, Paper, Stack, Button } from "@mui/material"
import React from "react"


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


export interface SpeedRateSwitchPanelProps {
  open: boolean,
  anchorEl: any,
  onOpenStateChange: (open: boolean) => void
}

export default function SpeedRateSwitchPanel(props: SpeedRateSwitchPanelProps) {
  const [speedRate, setSpeedRate] = React.useState("1.0")
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
              bgcolor: "black",
              marginBottom: 2,
              paddingTop: 1,
              paddingBottom: 1,
            }}
          >
            <Stack>
              {
                ["2", "1.5", "1.25", "1.0", "0.75", "0.5"].map((rate, index) => {
                  return <Button key={index} sx={[{ color: "white" }, speedRate === rate && { color: "#2194f2" }]} onClick={() => { speedRateSwitch(rate); setSpeedRate(rate) }}>{rate}x</Button>
                })
              }
            </Stack>
          </Paper>
        </Fade>
      )}
    </Popper>
  )
}
