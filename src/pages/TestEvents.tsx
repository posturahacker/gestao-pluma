import React, { useEffect } from 'react';
import { trackPageView, trackContact, testEvent } from '@/services/MetaConversionsAPI';

const TestEvents = () => {
  useEffect(() => {
    // Enviar evento PageView automaticamente ao carregar a página
    trackPageView();
  }, []);

  const handleTestEvent = (eventName: string) => {
    testEvent(eventName);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-2xl font-bold mb-6">Teste de Eventos da API de Conversões do Meta</h1>
      <p className="mb-4 text-gray-600">
        Código de teste em uso: <code className="bg-gray-100 px-2 py-1 rounded">TEST11067</code>
      </p>
      
      <div className="space-y-6">
        <div className="p-6 border rounded-md bg-white">
          <h2 className="text-xl font-medium mb-4">Eventos Disponíveis</h2>
          
          <div className="space-y-3">
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
              onClick={() => handleTestEvent('PageView')}
            >
              Testar PageView
            </button>
            
            <button 
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
              onClick={() => handleTestEvent('Contact')}
            >
              Testar Contact
            </button>
            
            <button 
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded w-full"
              onClick={() => trackContact('WhatsApp Test')}
            >
              Testar Contact (WhatsApp)
            </button>
            
            <button 
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded w-full"
              onClick={() => handleTestEvent('CustomEvent')}
            >
              Testar Evento Personalizado
            </button>
          </div>
        </div>
        
        <div className="p-6 border rounded-md bg-white">
          <h2 className="text-xl font-medium mb-4">Instruções</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Clique nos botões acima para enviar eventos de teste</li>
            <li>Verifique no console do navegador as mensagens de sucesso</li>
            <li>Acesse o Gerenciador de Eventos do Meta e vá para a seção "Eventos de Teste"</li>
            <li>Você deve ver os eventos de teste listados com o código <code>TEST11067</code></li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TestEvents; 