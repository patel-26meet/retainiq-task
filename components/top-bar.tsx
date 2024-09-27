import { ArrowLeft } from "lucide-react"
import { ChangeEvent, useState } from "react"
import GitHubLink from "../app/githublink.js"

export const TopBar = () => {
    const [head, sethead] = useState<string |undefined>(undefined);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        sethead(event.target.value);
    }

    return(
        <div className="flex justify-between">
            <div className="ml-6 mt-6 mb-0 flex">
                <ArrowLeft/>
                <input
                type="text"
                value={head}
                onChange={handleInputChange}
                style={{
                    borderBottom: "1px solid #000",
                    width: "250px",
                    textAlign: "center",
                    fontSize: "16px",
                    outline: "none",
                }}
                className="ml-3 mr-3"
                />
                <button className="bg-[#eef6fd] border border-sky-500 rounded-lg text-xs text-[#3e87ec]"><div className="ml-3 mr-3">Primary Feed</div></button>
            </div>
            <GitHubLink/>
            <button className="bg-[#03ae57] border border-[#1f9d65] rounded-lg text-xs text-white h-9 mt-5 mr-3"><div className="ml-3 mr-3">Publish Feed</div></button>
        </div>
    )
}