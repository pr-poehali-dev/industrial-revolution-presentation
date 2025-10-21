import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { speakerNotes } from '@/data/speakerNotes';

export default function Index() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const downloadPPTX = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/d20d4e0c-6187-4400-8250-2414ee94e1f9');
      const data = await response.json();
      
      if (data.success && data.fileBase64) {
        const byteCharacters = atob(data.fileBase64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' });
        
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = data.filename || 'industrial_revolution.pptx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        toast({
          title: "Готово!",
          description: "Презентация успешно скачана",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось скачать презентацию",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const slides = [
    {
      id: 0,
      title: 'Этапы Индустриальной Революции',
      icon: 'Settings',
      content: [
        {
          stage: 'Первая революция',
          period: '1760-1840',
          description: 'Механизация производства, паровой двигатель, текстильная промышленность',
          examples: ['Великобритания: текстильные фабрики', 'Паровые машины Уатта', 'Железные дороги']
        },
        {
          stage: 'Вторая революция',
          period: '1870-1914',
          description: 'Электричество, нефть, массовое производство',
          examples: ['США: конвейер Форда', 'Электрификация городов', 'Химическая промышленность']
        },
        {
          stage: 'Третья революция',
          period: '1950-2000',
          description: 'Компьютеризация, автоматизация, информационные технологии',
          examples: ['Роботизация производства', 'Интернет и IT-сектор', 'Глобализация экономики']
        }
      ]
    },
    {
      id: 1,
      title: 'Ключевые Изобретения',
      icon: 'Cog',
      content: [
        {
          invention: 'Паровой двигатель',
          year: '1769',
          inventor: 'Джеймс Уатт',
          impact: 'Революция в транспорте и производстве',
          examples: ['Паровозы', 'Пароходы', 'Фабричные станки']
        },
        {
          invention: 'Ткацкий станок',
          year: '1785',
          inventor: 'Эдмунд Картрайт',
          impact: 'Рост производительности в 40 раз',
          examples: ['Текстильные фабрики', 'Массовое производство ткани', 'Снижение цен']
        },
        {
          invention: 'Электрическая лампа',
          year: '1879',
          inventor: 'Томас Эдисон',
          impact: 'Круглосуточная работа предприятий',
          examples: ['Ночные смены', 'Рост производства', 'Урбанизация']
        }
      ]
    },
    {
      id: 2,
      title: 'Экономические Результаты',
      icon: 'TrendingUp',
      content: [
        {
          result: 'Рост ВВП',
          metric: '+400%',
          period: '1800-1900',
          description: 'Увеличение валового продукта развитых стран',
          examples: ['Великобритания: с £350M до £2B', 'США: рост экономики в 15 раз', 'Германия: промышленный бум']
        },
        {
          result: 'Урбанизация',
          metric: '10% → 80%',
          period: '1800-2000',
          description: 'Переселение населения в города',
          examples: ['Лондон: 1M → 7M жителей', 'Новые промышленные города', 'Развитие инфраструктуры']
        },
        {
          result: 'Производительность труда',
          metric: '+1500%',
          period: '1760-1900',
          description: 'Рост выработки на одного рабочего',
          examples: ['Текстиль: с 1 до 40 метров/день', 'Сталь: рост производства в 200 раз', 'Снижение стоимости товаров']
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-industrial-dark via-industrial-gray to-industrial-dark">
      <header className="border-b-4 border-industrial-copper bg-industrial-dark/90 backdrop-blur">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Icon name="Settings" size={48} className="text-industrial-copper animate-spin-slow" />
              <Icon name="Cog" size={28} className="text-industrial-copper/60 absolute top-0 right-0 animate-spin-reverse" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white font-oswald tracking-wider">
                ИНДУСТРИАЛЬНАЯ РЕВОЛЮЦИЯ
              </h1>
              <p className="text-industrial-light mt-1">Экономическая трансформация человечества</p>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-industrial-dark/50 border-b-2 border-industrial-copper/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex gap-2 justify-center flex-wrap">
            {slides.map((slide) => (
              <Button
                key={slide.id}
                onClick={() => setActiveSlide(slide.id)}
                variant={activeSlide === slide.id ? 'default' : 'outline'}
                className={`gap-2 transition-all ${
                  activeSlide === slide.id
                    ? 'bg-industrial-copper hover:bg-industrial-copper/90 text-white border-industrial-copper shadow-lg scale-105'
                    : 'border-industrial-copper/50 text-industrial-light hover:bg-industrial-copper/20'
                }`}
              >
                <Icon name={slide.icon as any} size={20} />
                {slide.title.split(' ')[0]}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12">
        <div className="animate-fade-in">
          <h2 className="text-5xl font-bold text-white mb-8 font-oswald tracking-wide flex items-center gap-4">
            <Icon name={slides[activeSlide].icon as any} size={48} className="text-industrial-copper" />
            {slides[activeSlide].title}
          </h2>

          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            {activeSlide === 0 && slides[0].content.map((item, index) => (
              <Card key={index} className="bg-industrial-dark/80 border-2 border-industrial-copper/30 p-6 hover:border-industrial-copper transition-all hover:scale-105 hover:shadow-2xl hover:shadow-industrial-copper/20">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-industrial-copper p-3 rounded">
                    <Icon name="Factory" size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-industrial-copper font-oswald">{item.stage}</h3>
                    <p className="text-industrial-light font-semibold">{item.period}</p>
                  </div>
                </div>
                <p className="text-white mb-4">{item.description}</p>
                <div className="space-y-2">
                  {item.examples.map((example, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Icon name="ChevronRight" size={16} className="text-industrial-copper mt-1 flex-shrink-0" />
                      <p className="text-industrial-light text-sm">{example}</p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}

            {activeSlide === 1 && slides[1].content.map((item, index) => (
              <Card key={index} className="bg-industrial-dark/80 border-2 border-industrial-copper/30 p-6 hover:border-industrial-copper transition-all hover:scale-105 hover:shadow-2xl hover:shadow-industrial-copper/20">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-industrial-copper p-3 rounded">
                    <Icon name="Lightbulb" size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-industrial-copper font-oswald">{item.invention}</h3>
                    <p className="text-industrial-light font-semibold">{item.year} • {item.inventor}</p>
                  </div>
                </div>
                <p className="text-white mb-4 font-semibold">{item.impact}</p>
                <div className="space-y-2">
                  {item.examples.map((example, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Icon name="Zap" size={16} className="text-industrial-copper mt-1 flex-shrink-0" />
                      <p className="text-industrial-light text-sm">{example}</p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}

            {activeSlide === 2 && slides[2].content.map((item, index) => (
              <Card key={index} className="bg-industrial-dark/80 border-2 border-industrial-copper/30 p-6 hover:border-industrial-copper transition-all hover:scale-105 hover:shadow-2xl hover:shadow-industrial-copper/20">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-industrial-copper p-3 rounded">
                    <Icon name="BarChart3" size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-industrial-copper font-oswald">{item.result}</h3>
                    <p className="text-white text-3xl font-bold mt-1">{item.metric}</p>
                  </div>
                </div>
                <p className="text-industrial-light text-sm mb-2">{item.period}</p>
                <p className="text-white mb-4">{item.description}</p>
                <div className="space-y-2">
                  {item.examples.map((example, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Icon name="TrendingUp" size={16} className="text-industrial-copper mt-1 flex-shrink-0" />
                      <p className="text-industrial-light text-sm">{example}</p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {showSpeakerNotes && (
        <div className="fixed bottom-0 left-0 right-0 bg-industrial-dark border-t-4 border-industrial-copper shadow-2xl animate-fade-in max-h-64 overflow-y-auto">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-start gap-4">
              <Icon name="FileText" size={24} className="text-industrial-copper flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-industrial-copper mb-3 font-oswald">
                  {activeSlide === 0 && slides[0].content.map((_, i) => i).includes(0) ? speakerNotes[0].intro : 
                   activeSlide === 1 && slides[1].content.map((_, i) => i).includes(0) ? speakerNotes[1].intro :
                   activeSlide === 2 && slides[2].content.map((_, i) => i).includes(0) ? speakerNotes[2].intro : ''}
                </h3>
                <div className="space-y-3">
                  {speakerNotes[activeSlide]?.slides.map((note, index) => (
                    <div key={index} className="bg-industrial-gray/20 p-4 rounded border-l-4 border-industrial-copper">
                      <p className="text-sm font-semibold text-industrial-copper mb-1">
                        Слайд {index + 1}:
                      </p>
                      <p className="text-white text-sm leading-relaxed">{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t-2 border-industrial-copper/30 bg-industrial-dark/90 mt-12">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Icon name="Settings" size={24} className="text-industrial-copper animate-spin-slow" />
                <p className="text-industrial-light text-sm">
                  Слайд {activeSlide + 1} из {slides.length}
                </p>
              </div>
              <Button
                onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
                variant="outline"
                size="sm"
                className={`gap-2 ${
                  showSpeakerNotes
                    ? 'bg-industrial-copper text-white border-industrial-copper'
                    : 'border-industrial-copper/50 text-industrial-light hover:bg-industrial-copper/20'
                }`}
              >
                <Icon name="FileText" size={16} />
                Текст доклада
              </Button>
              <Button
                onClick={downloadPPTX}
                disabled={isDownloading}
                variant="outline"
                size="sm"
                className="gap-2 border-industrial-copper/50 text-industrial-light hover:bg-industrial-copper/20"
              >
                <Icon name={isDownloading ? "Loader2" : "Download"} size={16} className={isDownloading ? "animate-spin" : ""} />
                {isDownloading ? 'Создаю...' : 'Скачать PPTX'}
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setActiveSlide(Math.max(0, activeSlide - 1))}
                disabled={activeSlide === 0}
                variant="outline"
                size="sm"
                className="border-industrial-copper/50 text-industrial-light hover:bg-industrial-copper/20"
              >
                <Icon name="ChevronLeft" size={16} />
              </Button>
              <Button
                onClick={() => setActiveSlide(Math.min(slides.length - 1, activeSlide + 1))}
                disabled={activeSlide === slides.length - 1}
                variant="outline"
                size="sm"
                className="border-industrial-copper/50 text-industrial-light hover:bg-industrial-copper/20"
              >
                <Icon name="ChevronRight" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}