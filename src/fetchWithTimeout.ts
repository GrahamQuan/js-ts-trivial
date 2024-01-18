interface TimeoutFetchOptions extends RequestInit {
  timeout?: number;
}

function createRequest(timeout: number = 3000) {
  return async <T>(
    url: string,
    fetchOptions: Partial<RequestInit>
  ): Promise<T> => {
    return new Promise<T>(async (resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('timeout'));
      }, timeout);

      try {
        const response = await fetch(url, fetchOptions);
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(
            `request failed: ${response.status} ${response.statusText}`
          );
        }
        const data = (await response.json()) as T;
        resolve(data);
      } catch (error) {
        reject(error);
        clearTimeout(timeoutId);
      }
    });
  };
}

const newRequest = createRequest();

const apiUrl = 'https://jsonplaceholder.typicode.com/todos/1';
const wrongUrl = 'https://jsonplaceholder.typicode.com/todos/1asdasd';

type urlData = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
(async () => {
  try {
    const res = await newRequest<urlData>(wrongUrl, { method: 'GET' });
    console.log(res);
  } catch (error) {
    console.error(error);
  }
})();
