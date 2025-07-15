import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const PaymentStatusInfoModal = ({ isOpen, setIsOpen }) => {
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                            <DialogTitle className="text-lg font-semibold text-[#25A8D6]">
                                Understanding Payment Status
                            </DialogTitle>
                            <div className="mt-2 text-sm text-gray-700 leading-relaxed">
                                <p>
                                    Completing the Stripe payment doesn't automatically mark your order as <strong>"Paid"</strong>.
                                </p>
                                <p className="mt-2">
                                    All payments remain in <strong>"Pending"</strong> status until a MedEasy admin manually verifies and approves your transaction.
                                </p>
                                <p className="mt-2">
                                    Once approved, your payment status will be updated to <strong>"Paid"</strong>.
                                </p>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-1.5 text-sm rounded bg-[#25A8D6] text-white hover:bg-[#1d95c3]"
                                >
                                    Got it!
                                </button>
                            </div>
                        </DialogPanel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

export default PaymentStatusInfoModal
