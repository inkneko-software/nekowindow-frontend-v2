import { Popper, Fade, Paper, Typography, Slider } from "@mui/material";

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

export interface VolumePanelProps {
  open: boolean,
  volume: number,
  anchorEl: any,
  onOpenStateChange: (newState: boolean) => void,
  onVolumeChange: (newVolume: number) => void,
}

export default function VolumePanel(props: VolumePanelProps) {

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
              paddingBottom: 1
            }}
          >
            <Typography
              variant="subtitle2"
              color="#ffffff"
              sx={{
                width:
                  "100%",
                textAlign: "center",
                marginBottom: 1
              }}
            >
              {props.volume}
            </Typography>
            <Slider
              size="small"
              sx={{ height: 70 }}
              orientation="vertical"
              min={0}
              max={100}
              value={props.volume}
              onChange={(e, newVol) => props.onVolumeChange(newVol as number)}
            />
          </Paper>
        </Fade>
      )}
    </Popper>
  )
}
