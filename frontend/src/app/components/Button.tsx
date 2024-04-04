interface Props {
    onClick?: () => void;
    text: string;
    type?: "primary" | "login";
    className?: string;
    children?: React.ReactNode;
    isLoading?: boolean;
}

export default function Button(props: Props) {
    return (
        <button 
            disabled={props.isLoading}
            onClick={() => {
                props.onClick && props.onClick();
            }}
            className={`bg-slate-50 hover:bg-slate-200 text-black font-bold py-2 px-4 rounded duration-300
                ${props.type === "login" && "bg-slate-50 border-2 ring-follas-green ring-4 ring-inset text-follas-green"}
                ${props.className}
            `}
        >
            {props.text}
            {props.children}
            {props.isLoading && "Loading..."}
        </button>
    );
}
