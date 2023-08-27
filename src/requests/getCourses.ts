if (process.env.NODE_ENV === 'development') {
    import('../mocks/browser').then(({ worker }) => worker.start());
}

export async function getCourses() {
    const
        data = await fetch('/courses'),
        jsonData = await data.json();
    
    return jsonData;
}