import { useTheme } from "../hooks/useTheme"

export const Main = () => {
    const theme = useTheme()
    return (
            <div className="mainWrapper" style={{backgroundColor: theme.main}}></div>
    )
}