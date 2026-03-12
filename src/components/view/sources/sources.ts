import { Source } from '../../../types';
import './sources.css';

class Sources {
    public draw(data: Source[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector(
            '#sourceItemTemp'
        ) as HTMLTemplateElement;

        data.forEach(item => {
            const sourceClone = sourceItemTemp.content.cloneNode(
                true
            ) as DocumentFragment;

            const nameElement = sourceClone.querySelector(
                '.source__item-name'
            ) as HTMLElement;
            if (nameElement) nameElement.textContent = item.name;

            const sourceItem = sourceClone.querySelector(
                '.source__item'
            ) as HTMLElement;
            if (sourceItem) sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources') as HTMLElement;
        if (sourcesContainer) sourcesContainer.append(fragment);
    }
}

export default Sources;