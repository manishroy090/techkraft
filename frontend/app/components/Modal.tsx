import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
const Modal = ({ children, showModal,className }: { children: React.ReactNode; showModal:Boolean;className?:string}) => {
    return (
        <div
            className={
                showModal
                    ? "fixed inset-2 z-10 h-full w-full flex items-center justify-center bg-black/60"
                    : "hidden"
            }
            aria-modal="true"
            role="dialog"
        >
            <div>
            </div>
            <div className={`bg-white rounded-2xl shadow-xl ${className}`}>
                {/* <div className='flex justify-end'>
                    <CloseOutlinedIcon />
                </div> */}
                {children}
            </div>
        </div>
    );
};

export default Modal;