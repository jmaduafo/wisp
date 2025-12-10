import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import RadialTimer from "@/components/ui/timer/RadialTimer";
import Widget from "@/components/ui/widget/Widget";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/ui/loading/Loader";
import { Volume2, VolumeOff, Pause, Play, CircleCheck } from "lucide-react";
import Counter from "@/components/ui/timer/Counter";
import { secondsFormat } from "@/utils/misc";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem, } from "@/components/ui/select";
export default function Timer() {
    const { userData } = useAuth();
    const [isVolumeOn, setIsVolumeOn] = useState(true);
    const [duration, setDuration] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isCounter, setIsCounter] = useState(true);
    const [isChoices, setIsChoices] = useState(true);
    const [choice, setChoice] = useState("");
    const [hourCount, setHourCount] = useState(0);
    const [minuteCount, setMinuteCount] = useState(0);
    const [secondCount, setSecondCount] = useState(0);
    const allZero = hourCount === 0 && minuteCount === 0 && secondCount === 0;
    const audioRef = useRef(null);
    function getCountdown() {
        if (allZero) {
            return;
        }
        setDuration(secondsFormat(hourCount, minuteCount, secondCount));
        setTimeLeft(secondsFormat(hourCount, minuteCount, secondCount));
        setIsCounter(false);
        setIsRunning(true);
        setIsChoices(false);
    }
    function pausePlay() {
        setIsRunning((prev) => !prev);
        if (isRunning && timeLeft === 0) {
            setHourCount(0);
            setMinuteCount(0);
            setSecondCount(0);
            setIsRunning(false);
            setIsCounter(true);
            setIsChoices(true);
        }
    }
    function stop() {
        setHourCount(0);
        setMinuteCount(0);
        setSecondCount(0);
        setIsRunning(false);
        setIsCounter(true);
        setIsChoices(true);
    }
    // This effect watches timeLeft and plays the sound
    useEffect(() => {
        if (timeLeft === 0 && isRunning && isVolumeOn) {
            try {
                // PLAY AUDIO ONCE THE TIMER RUNS OUT AND IF THE VOLUME IS ON
                audioRef.current?.play();
            }
            catch (error) {
                console.error("Audio playback failed:", error);
            }
        }
        else {
            // DON'T PLAY IF CONDITIONS ARE NOT MET
            audioRef.current?.pause();
        }
    }, [timeLeft, isRunning, isVolumeOn]);
    return (_jsx(Widget, { padding: "p-2", children: !userData ? (_jsx(Loader, {})) : (_jsxs("div", { children: [_jsx("div", { className: "flex justify-end", children: _jsx("button", { className: "cursor-pointer", onClick: () => setIsVolumeOn((prev) => !prev), children: isVolumeOn ? (_jsx(Volume2, { className: "w-[7vw] h-[7vw]", strokeWidth: 1.2 })) : (_jsx(VolumeOff, { className: "w-[7vw] h-[7vw]", strokeWidth: 1.2 })) }) }), _jsx("audio", { ref: audioRef, loop: true, children: _jsx("source", { src: "/audio/digital_clock.wav", type: "audio/wav" }) }), _jsx("div", { className: "flex justify-center mt-2", children: isChoices ? (_jsxs(Select, { onValueChange: setChoice, value: choice, children: [_jsx(SelectTrigger, { className: "w-[180px]", size: "sm", style: {
                                    borderColor: userData.secondary_color + "25",
                                    color: userData.secondary_color + "80",
                                }, children: _jsx(SelectValue, { placeholder: "Choose a task" }) }), _jsx(SelectContent, { className: "", children: _jsxs(SelectGroup, { children: [_jsx(SelectLabel, { children: "Tasks" }), ["Pomodoro", "Break"].map((item) => {
                                            return (_jsx(SelectItem, { value: item, children: item }, item));
                                        })] }) })] })) : (_jsx("p", { className: "text-xs px-3 py-1 rounded-full", style: {
                            color: userData.primary_color,
                            backgroundColor: userData.secondary_color,
                        }, children: choice === "Pomodoro" || !choice.length ? "Focus" : choice })) }), _jsx("div", { className: "flex justify-center items-center mt-[6vh]", children: _jsx(RadialTimer, { isRunning: isRunning, setTimeLeft: setTimeLeft, timeLeft: timeLeft, duration: duration, secondary_color: userData?.secondary_color }) }), _jsx("div", { className: "mt-[6vh]", children: isCounter ? (_jsxs("div", { className: "flex justify-center items-end gap-2", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx(Counter, { setCount: setHourCount, count: hourCount, secondary_color: userData.secondary_color, max_count: 23, title: "Hour" }), _jsx(Counter, { setCount: setMinuteCount, count: minuteCount, secondary_color: userData.secondary_color, max_count: 59, title: "Min" }), _jsx(Counter, { setCount: setSecondCount, count: secondCount, secondary_color: userData.secondary_color, max_count: 59, title: "Sec" })] }), _jsx("button", { className: "cursor-pointer pb-1", disabled: allZero, onClick: getCountdown, children: _jsx(CircleCheck, { className: "w-[7vw] h-[7vw]", strokeWidth: 1 }) })] })) : (_jsxs("div", { className: "flex justify-center items-center gap-2", children: [_jsx("button", { onClick: pausePlay, className: "cursor-pointer border rounded-sm w-[9vw] h-[9vw] flex justify-center items-center hover:bg-white/10 duration-300", style: {
                                    borderColor: userData.secondary_color + "50",
                                    color: userData.secondary_color,
                                }, children: isRunning ? (_jsx(Pause, { className: "w-[5vw] h-[5vw] opacity-100", strokeWidth: 1 })) : (_jsx(Play, { className: "w-[5vw] h-[5vw]", strokeWidth: 1 })) }), _jsx("button", { onClick: stop, className: "cursor-pointer border rounded-sm w-[9vw] h-[9vw] flex justify-center items-center hover:bg-white/10 duration-300", style: { borderColor: userData.secondary_color + "50" }, children: _jsx("span", { className: "w-[4.5vw] h-[4.5vw] rounded-[3px] opacity-80", style: { backgroundColor: userData.secondary_color } }) })] })) })] })) }));
}
