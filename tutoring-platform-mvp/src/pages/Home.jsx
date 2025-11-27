import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, ArrowRight, Star, CheckCircle } from 'lucide-react';

function Home() {
  const testimonials = [
    {
      id: 1,
      name: "Marie D.",
      role: "Étudiante en Terminale",
      text: "Grâce à TutorConnect, j'ai trouvé un tuteur en maths qui a vraiment transformé ma compréhension. Je recommande !",
      rating: 5,
    },
    {
      id: 2,
      name: "Lucas B.",
      role: "Tuteur en Informatique",
      text: "Super plateforme pour partager mes connaissances et aider d'autres étudiants tout en gagnant un complément.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emma L.",
      role: "Étudiante en Licence",
      text: "Interface simple et tuteurs qualifiés. J'ai progressé en anglais en quelques semaines seulement !",
      rating: 5,
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Large choix de matières",
      description: "Mathématiques, sciences, langues, informatique... Trouvez le tuteur parfait pour vos besoins.",
    },
    {
      icon: Users,
      title: "Tuteurs qualifiés",
      description: "Tous nos tuteurs sont étudiants avancés ou experts dans leur domaine.",
    },
    {
      icon: Award,
      title: "Tarifs accessibles",
      description: "Des prix adaptés aux budgets étudiants, à partir de 15€/heure.",
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-blue-800 text-white">
        <div className="container-custom py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              L'apprentissage par les pairs,{' '}
              <span className="text-primary-200">simplifié</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Connectez-vous avec des tuteurs passionnés et atteignez vos objectifs académiques
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/student-dashboard" className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 transition-colors shadow-lg">
                <span>Trouver un tuteur</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/tutor-dashboard" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all">
                Devenir tuteur
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Pourquoi choisir TutorConnect ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Comment ça marche ?
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Parcourez les profils
                </h3>
                <p className="text-gray-600">
                  Découvrez nos tuteurs qualifiés dans diverses matières
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Demandez une session
                </h3>
                <p className="text-gray-600">
                  Contactez le tuteur de votre choix et planifiez votre première séance
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Progressez ensemble
                </h3>
                <p className="text-gray-600">
                  Apprenez à votre rythme avec un accompagnement personnalisé
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Ce que disent nos utilisateurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card p-6">
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-blue-700 text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à commencer votre parcours d'apprentissage ?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Rejoignez des milliers d'étudiants qui progressent avec TutorConnect
          </p>
          <Link
            to="/register"
            className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center space-x-2 transition-colors shadow-lg"
          >
            <span>Commencer maintenant</span>
            <CheckCircle className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
