import {FiArrowUp} from "react-icons/fi";

export const CardSummary = (props: any) => {
    return (
        <div className="flex flex-wrap justify-between items-end border rounded-lg w-full max-w-xl p-4 bg-white">
            <div>
                <p className="mb-4">{props?.title}</p>
                <p className="text-2xl font-semibold">{props?.value}</p>
            </div>
            <p className="bg-green-500/20 rounded px-2 flex gap-1 text-sm items-center text-green-600"><FiArrowUp/>10%
            </p>
        </div>
    )
}
