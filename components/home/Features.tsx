export default function Features({ dict }: { dict: any }) {
    const features = [
        {
            title: dict.home.features.flight.title,
            desc: dict.home.features.flight.desc,
            icon: "✈️",
        },
        {
            title: dict.home.features.ai.title,
            desc: dict.home.features.ai.desc,
            icon: "🤖",
        },
        {
            title: dict.home.features.charging.title,
            desc: dict.home.features.charging.desc,
            icon: "🔋",
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-primary">
                    {dict.home.features.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-8 rounded-2xl bg-grey-light border border-grey-light transition-all hover:shadow-xl hover:border-accent"
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-2 text-grey-dark">
                                {feature.title}
                            </h3>
                            <p className="text-grey-dark/70 leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
