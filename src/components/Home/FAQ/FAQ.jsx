import React from 'react';
import Container from '../../container/Container';


const FAQ = () => {
    return (
        <Container>
            <section className="my-32">
                <h2 className="text-3xl font-bold text-center mb-6 text-[#25A8D6]">Frequently Asked Questions</h2>
                <div className="max-w-3xl mx-auto space-y-4">
                    {[
                        {
                            question: "How can I verify the authenticity of the medicines sold on your website?",
                            answer: "All medicines on our platform are sourced from licensed pharmacies and suppliers. Each product comes with a certification and batch number to ensure authenticity."
                        },
                        {
                            question: "What should I do if I experience side effects after taking a medicine purchased here?",
                            answer: "If you experience any side effects, please stop using the medicine immediately and consult your healthcare provider. You can also contact our support team for assistance."
                        },
                        {
                            question: "Do you require a prescription to order prescription medicines?",
                            answer: "Yes, we require a valid prescription uploaded at checkout for all prescription-only medicines to comply with legal and safety regulations."
                        },
                        {
                            question: "How long does delivery take, and do you ship internationally?",
                            answer: "Delivery times depend on your location but typically range from 2-7 business days. Currently, we only ship within your country, but international shipping options may be added soon."
                        },
                        {
                            question: "Can I return or exchange medicines if I am not satisfied?",
                            answer: "Due to the sensitive nature of medicines, we only accept returns or exchanges for damaged or incorrect items. Please contact our support within 48 hours of delivery for assistance."
                        },
                        {
                            question: "Are the medicines stored and shipped under proper conditions?",
                            answer: "Absolutely. We follow strict guidelines for storage and shipping to maintain medicine efficacy, including temperature control where necessary."
                        },
                        {
                            question: "How do I contact customer support for further help?",
                            answer: "You can reach our customer support team via email at support@medeasy.com or call us at +1 234 567 890 during business hours."
                        },
                    ].map(({ question, answer }, i) => (
                        <div
                            tabIndex={0}
                            className="collapse collapse-plus border border-gray-300 rounded-lg bg-white dark:bg-gray-100 hover:border-[#25A8D6] hover:shadow-lg transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-[#25A8D6]"
                            key={i}
                        >
                            <input type="checkbox" />
                            <div className="collapse-title text-lg font-semibold text-gray-700 dark:text-gray-900 cursor-pointer hover:text-[#25A8D6] transition-colors duration-300 flex items-center justify-between">
                                {question}
                                <svg
                                    className="w-5 h-5 transition-transform duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                            <div className="collapse-content text-gray-600 dark:text-gray-800 mt-2 px-2">
                                <p>{answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </Container>
    );
};

export default FAQ;